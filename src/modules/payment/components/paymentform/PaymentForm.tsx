import { useState, useContext, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useModals } from '../../../../shared/hooks/modals/useModals.hook';
import { Calendar } from 'primereact/calendar';
import { PaymentSchema } from '../../../../shared/schemas/PaymentSchema';
import { useShoppingCart } from '../../../../context/shoppingCartContext';
import { AuthenticationContext } from '../../../auth/Authentication.context';
import { CreateOrderDto } from '../../../../shared/datasources/order/order.entity';
import { useCreateOrder } from '../../../../shared/datasources/order/useCreateOrder.hook';
import '../paymentform/PaymentForm.Styles.css';

const PaymentForm = () => {
  const { showSuccessModal, showErrorModal } = useModals();
  const { cartItems, resetCart } = useShoppingCart();
  const { user } = useContext(AuthenticationContext);
  const [newOrder, setNewOrder] = useState<CreateOrderDto>();
  const currentDate = new Date();
  const Data = {
    name: '',
    cardNumber: '',
    expiredDate: null,
    securityCode: ''
  };
  const [formData, setFormData] = useState(Data);
  const handleInputChange = (e: any, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  const { createOrder } = useCreateOrder();

  useEffect(() => {
    setNewOrder({
      userId: user!.id,
      purchaseDate: currentDate,
      status: 'InPreparation',
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      }))
    });

    console.log('Product Order Pending');
  }, []);

  const handleConfirmPayment = () => {
    const validation = PaymentSchema.safeParse(formData);

    if (validation.success) {
      showSuccessModal(
        'Pago exitoso',
        'Se ha confirmado el pago correctamente.'
      );
      setFormData(Data);

      console.log(newOrder);
      createOrder(newOrder!);
      resetCart();
    } else {
      showErrorModal(
        'Error en el pago',
        'Por favor complete todos los campos correctamente.'
      );
    }
  };

  return (
    <div className="payment-form-container">
      <Card title="Pago de productos">
        <div className="field" style={{ margin: '30px' }}>
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-user" />
            <InputText
              id="name"
              className="custom-input"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
            <label htmlFor="Name">Nombre</label>
          </span>
        </div>
        <div className="field" style={{ margin: '10px' }}>
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-lock" />
            <InputText
              id="cardNumber"
              className="custom-input"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange(e, 'cardNumber')}
            />
            <label htmlFor="cardNumber">Número de la tarjeta</label>
          </span>
        </div>
        <div className="field-group">
          <div className="field" style={{ marginTop: '15px' }}>
            <span className="p-float-label p-input-icon-right">
              <i className="custom-input" />
              <Calendar
                id="expiredDate"
                className="ExpireDate"
                value={formData.expiredDate}
                onChange={(e) => handleInputChange(e, 'expiredDate')}
                dateFormat="dd/mm/yy"
              />
              <label htmlFor="ExpiredDate">Fecha vencimiento</label>
            </span>
          </div>
          <div className="field" style={{ marginTop: '15px' }}>
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-question" />
              <InputText
                id="securityCode"
                className="security-code"
                value={formData.securityCode}
                onChange={(e) => handleInputChange(e, 'securityCode')}
              />
              <label htmlFor="SecurityCode">Código de seguridad</label>
            </span>
          </div>
        </div>
        <Button
          label="Confirmar pago"
          className="confirm-button"
          onClick={handleConfirmPayment}
        />
      </Card>
    </div>
  );
};

export default PaymentForm;
