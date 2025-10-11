'use client';

import { useEffect } from 'react';

declare const paypal: any;

export const PayPalButton = () => {
  useEffect(() => {
    // Check if the PayPal script is already loaded
    if (window.paypal) {
      // Check if the button is already rendered
      if (document.getElementById('paypal-button-container-P-3A8278213L525924FNDVH53Y')?.childElementCount === 0) {
        paypal.Buttons({
          style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'subscribe'
          },
          createSubscription: function(data: any, actions: any) {
            return actions.subscription.create({
              /* Creates the subscription */
              plan_id: 'P-3A8278213L525924FNDVH53Y'
            });
          },
          onApprove: function(data: any, actions: any) {
            alert(data.subscriptionID); // You can add optional success message for the subscriber here
          }
        }).render('#paypal-button-container-P-3A8278213L525924FNDVH53Y');
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AcfpjwLgDGThXpyOnYWUoWdFG7SM_h485vJULqGENmPyeiwfD20Prjfx6xRrqYOSZlM4s-Rnh3OfjXhk&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.onload = () => {
      if (document.getElementById('paypal-button-container-P-3A8278213L525924FNDVH53Y')?.childElementCount === 0) {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'subscribe'
            },
            createSubscription: function(data: any, actions: any) {
              return actions.subscription.create({
                /* Creates the subscription */
                plan_id: 'P-3A8278213L525924FNDVH53Y'
              });
            },
            onApprove: function(data: any, actions: any) {
              alert(data.subscriptionID); // You can add optional success message for the subscriber here
            }
        }).render('#paypal-button-container-P-3A8278213L525924FNDVH53Y');
      }
    };
    document.body.appendChild(script);

  }, []);

  return <div id="paypal-button-container-P-3A8278213L525924FNDVH53Y"></div>;
};
