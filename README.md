# JG Stripe Forms
This script automates the process of creating Stripe card payment inputs on you payment forms, allowing you to quickly build payment forms.  To begin, include Stripe's script as defined below, and define your Stripe public key on the window's *jg_stripe_public_key* field:

```html
<script>
    window['jg_stripe_public_key'] = "pk_STRIPE_PUBLIC_KEY_HERE..."
</script>

<script src="https://js.stripe.com/v3/"></script>
```

jg_stripe_charge_input.js will use this value to create the payment field.  Then, on your payment form, begin by adding the *jg_checkout_form* class to the form.  Then, add a div with the id set to *jg_stripe_card_container* whereever you would like the payment field to appear within that form.  Finally, ensure you add a text input with the id set to *jg_card_holder_name_input*.  The script will automatically create the card payment input inside that div when the page renders.

```html
<form action="/" method="POST" id="jg_checkout_form">
    
    <!-- form fields here -->

    <input type="text" id="jg_card_holder_name_input">

    <div id="jg_stripe_card_container"></div>

    <input type="submit" value="submit">
</form>
```

This form will contain the card payment input, and submit the billing details to the server, where the payment can be processed.
# JGStripeForm
