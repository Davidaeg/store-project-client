import { Message } from 'primereact/message';

const EmptyCartMessage = () => {
  const customStyle = {
    background: '#f2f2f2', // light gray background
    color: '#fba855', // text color
    border: '1px solid #fba855', // border color
    borderRadius: '5px', // border radius
    padding: '1rem' // padding
  };

  return (
    // <Message
    //   severity="info"
    //   text="Your Cart is Empty"

    // />

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
