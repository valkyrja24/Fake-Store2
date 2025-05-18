import React from 'react';

const HelpPage = () => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h1>Help Center</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '15px' }}>Frequently Asked Questions</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ marginBottom: '8px' }}>How do I place an order?</h3>
            <p>To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to be signed in to complete your purchase.</p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '8px' }}>What payment methods do you accept?</h3>
            <p>We accept credit cards, debit cards, and PayPal. All payments are securely processed.</p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '8px' }}>How long does shipping take?</h3>
            <p>Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout.</p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '8px' }}>What is your return policy?</h3>
            <p>We offer a 30-day return policy for most items. Products must be in original condition with tags attached.</p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '8px' }}>How do I track my order?</h3>
            <p>Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard.</p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 style={{ marginBottom: '15px' }}>Contact Us</h2>
        <p>Need more help? Our customer support team is available Monday through Friday, 9am to 5pm.</p>
        <p style={{ marginTop: '10px' }}>Email: support@fakestore.com</p>
        <p>Phone: (123) 456-7890</p>
      </section>
    </div>
  );
};

export default HelpPage;