
//must include stripe for this scirpt to work: <script src="https://js.stripe.com/v3/"></script>
const JG_CARD_INPUT_CONTAINER_ID = "jg_stripe_card_container"
const JG_STRIPE_PUBLIC_KEY_VARNAME = "jg_stripe_public_key"
const JG_PAYMENT_FORM_ID = "jg_checkout_form"
const JG_CARDHOLDER_NAME_INPUT_ID = "jg_card_holder_name_input"
const JG_PAYMENT_METHOD_ID_INPUT_ID = "jg_payment_method_id_input"
const JG_STRIPE_SUBMIT_KEY = "jg_form_submit"


//this init function is called in jg.js, do not call it directly!
export default function __init_jg_stripe_charge_input(e){
    //add card inputs
    jg_create_stripe_card_input()
}

function jg_create_stripe_card_input(){
    //create stripe inputs
    const stripe = Stripe(window[JG_STRIPE_PUBLIC_KEY_VARNAME])
    
    const elements = stripe.elements();
    const card_element = elements.create('card');
    
    card_element.mount('#' + JG_CARD_INPUT_CONTAINER_ID);

    //get elements using passed in ids
    const payment_form = document.getElementById(JG_PAYMENT_FORM_ID)
    const card_holder_name = document.getElementById(JG_CARDHOLDER_NAME_INPUT_ID);
    

    //add payment method id hidden input
    const pmid_input = document.createElement('input')
    pmid_input.type = 'hidden'
    pmid_input.name = 'payment_method_id'
    pmid_input.id = JG_PAYMENT_METHOD_ID_INPUT_ID
    payment_form.appendChild(pmid_input)
    

    //submit the payment form
    payment_form.addEventListener('submit', async (event) => {
        //prevent default form submission
        event.preventDefault()

        //get payment method from stripe
        const response = await stripe.createPaymentMethod(
            'card', card_element, {
                billing_details: { name: card_holder_name.value }
            }
        );
        payment_method = response.paymentMethod
        error = response.error

        //respond based on success of stripe api call
        if (error) {
            //display "error.message" to the user...
            console.log(error.message)
        } else {
            //the card has been verified successfully...
            console.log("verification success")
            console.log(payment_method)
            document.getElementById(JG_PAYMENT_METHOD_ID_INPUT_ID).value = payment_method.id
        }

        //submit the form
        if (!event.jg_submitted && event.jg_form_submit == JG_STRIPE_SUBMIT_KEY){
            event.jg_submitted = true
            console.log("stripe form submit")
            event.target.submit()
        }
    });

    //during the capture phase, mark that the form should be submitted by stripe (this will fire after honeypot and before ajax due to the event listener order in jg.js)
    payment_form.addEventListener('submit', (event)=>{
        event.jg_form_submit = JG_STRIPE_SUBMIT_KEY
    }, true)
}

