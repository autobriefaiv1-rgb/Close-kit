'use client';

import { useEffect } from 'react';

declare const paypal: any;

export const PayPalTeamButton = () => {
  useEffect(() => {
    const buttonContainerId = 'paypal-button-container-P-1WS55184A9046101RNDVIJZI';
    const planId = 'P-1WS55184A9046101RNDVIJZI';

    const renderButton = () => {
      if (document.getElementById(buttonContainerId)?.childElementCount === 0) {
        paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe',
          },
          createSubscription: function (data: any, actions: any) {
            return actions.subscription.create({
              plan_id: planId,
            });
          },
          onApprove: function (data: any, actions: any) {
            alert(`Subscription successful! Your ID is ${data.subscriptionID}`);
          },
        }).render(`#${buttonContainerId}`);
      }
    };

    if (window.paypal) {
      renderButton();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AcfpjwLgDGThXpyOnYWUoWdFG7SM_h485vJULqGENmPyeiwfD20Prjfx6xRrqYOSZlM4s-Rnh3OfjXhk&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.onload = renderButton;
    document.body.appendChild(script);

  }, []);

  return <div id="paypal-button-container-P-1WS55184A9046101RNDVIJZI"></div>;
};
