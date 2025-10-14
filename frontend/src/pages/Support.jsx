import Footer from '../components/Footer';

function Support() {
  return (
    <div>
      <h2>Support</h2>
      <p>Contact our support team via live chat or email.</p>
      <button onClick={() => window.smartsupp('chat:open')}>Talk to an Agent</button>
      <Footer />
    </div>
  );
}

export default Support;