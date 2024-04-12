const EmptyCartMessage = () => {
  return (
    <div
      style={{
        background: '#f2f2f2',
        color: '#fba855',
        border: '1px solid #fba855',
        borderRadius: '5px',
        padding: '2rem',
        fontSize: '1.5rem',
        textAlign: 'center'
      }}
    >
      Your Cart is Empty
    </div>
  );
};

export default EmptyCartMessage;
