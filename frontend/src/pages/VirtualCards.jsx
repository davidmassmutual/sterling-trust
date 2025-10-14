import Footer from '../components/Footer';
import '../styles/VirtualCards.css';

function VirtualCards() {
  return (
    <div className="virtual-cards">
      <h2>Virtual Cards</h2>
      <p>Create and manage your virtual cards here.</p>
      <button>Create New Card</button>
      <Footer />
    </div>
  );
}

export default VirtualCards;