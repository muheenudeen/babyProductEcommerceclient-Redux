function WishalistModal({ onClose, children }) {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <button onClick={onClose} className="text-red-500 float-right">Close</button>
          {children}
        </div>
      </div>
    );
  }
  
  export default WishalistModal;
  