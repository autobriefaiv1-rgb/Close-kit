'use server';
import {NextResponse} from 'next/server';
import {adminAuth, adminDb} from '@/firebase/admin';
import {headers} from 'next/headers';

// Exchange the authorization code for an access token
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(
    `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    }
  );

  const data = await response.json();
  return data.access_token;
}

export async function POST(req: Request) {
  const idToken = headers().get('Authorization')?.split('Bearer ')[1];

  if (!idToken) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    // 1. Verify the user's Firebase token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    const {subscriptionID, organizationId, planName} = await req.json();

    if (!subscriptionID || !organizationId || !planName) {
      return NextResponse.json(
        {error: 'Missing subscription or organization details'},
        {status: 400}
      );
    }

    // 2. Securely verify the subscription with PayPal on the backend
    const accessToken = await getPayPalAccessToken();
    const paypalResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionID}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const subscriptionDetails = await paypalResponse.json();

    // 3. If verification is successful, update Firestore
    if (subscriptionDetails.status === 'ACTIVE') {
      const orgRef = adminDb
        .collection('organizations')
        .doc(organizationId);

      // Ensure the user owns this organization before updating
      const orgDoc = await orgRef.get();
      if (!orgDoc.exists || orgDoc.data()?.ownerId !== userId) {
        return NextResponse.json({error: 'Forbidden'}, {status: 403});
      }

      await orgRef.update({
        subscriptionPlan: planName,
        subscriptionStatus: 'active',
        paypalSubscriptionId: subscriptionID,
      });

      return NextResponse.json({success: true});
    } else {
      // If PayPal does not confirm the subscription, return an error
      return NextResponse.json(
        {error: 'Subscription not verified with PayPal.'},
        {status: 400}
      );
    }
  } catch (error: any) {
    console.error('Error capturing subscription:', error);
    return NextResponse.json(
      {error: 'Internal Server Error', details: error.message},
      {status: 500}
    );
  }
}
