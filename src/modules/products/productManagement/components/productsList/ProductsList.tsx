import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import {
  InputNumber,
  InputNumberValueChangeEvent
} from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import Barcode from 'react-barcode';
import {
  Location,
  ProductForList
} from '../../../../../shared/datasources/products/products.types';
import { useShoppingCart } from '../../../../../context/ShoppingCartContext';

const SpanishLocations = {
  [Location.Estante1]: 'Estante 1',
  [Location.Estante2]: 'Estante 2',
  [Location.Estante3]: 'Estante 3'
};

export default function ProductsList() {
  let emptyProduct: ProductForList = {
    id: 0,
    code: '',
    name: '',
    image: '',
    price: 0,
    quantity: 0,
    inventoryStatus: 'EN INVENTARIO'
  };
  const { getAllProductsForList } = useShoppingCart();

  const [products, setProducts] = useState<ProductForList[]>([]);
  const [productDialog, setProductDialog] = useState<boolean>(false);
  const [deleteProductDialog, setDeleteProductDialog] =
    useState<boolean>(false);
  const [deleteProductsDialog, setDeleteProductsDialog] =
    useState<boolean>(false);
  const [product, setProduct] = useState<ProductForList>(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<ProductForList[]>(
    []
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<ProductForList[]>>(null);

  useEffect(() => {
    setProducts(getAllProductsForList());
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-CR', {
      style: 'currency',
      currency: 'CRC'
    });
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Producto actualizado',
          life: 3000
        });
      } else {
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Producto Creado',
          life: 3000
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product: ProductForList) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: ProductForList) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Producto eliminado',
      life: 3000
    });
  };

  const findIndexById = (id: number) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts([]);
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Productos eliminados',
      life: 3000
    });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    // @ts-ignore
    _product[name] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (
    e: InputNumberValueChangeEvent,
    name: string
  ) => {
    const val = e.value ?? 0;
    let _product = { ...product };

    // @ts-ignore
    _product[name] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Exportar CSV"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const imageBodyTemplate = (rowData: ProductForList) => {
    return (
      <img
        src={`${rowData.image}`}
        alt={rowData.image!}
        className="shadow-2 border-round"
        style={{ width: '64px' }}
      />
    );
  };

  const priceBodyTemplate = (rowData: ProductForList) => {
    return formatCurrency(rowData.price);
  };

  const statusBodyTemplate = (rowData: ProductForList) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };

  const actionBodyTemplate = (rowData: ProductForList) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product: ProductForList) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Gestionar productos</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Buscar..."
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setGlobalFilter(target.value);
          }}
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedProducts(e.value);
            }
          }}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first}  a {last} de {totalRecords} productos"
          globalFilter={globalFilter}
          header={header}
          selectionMode="multiple"
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="code"
            header="Codigo"
            sortable
            style={{ minWidth: '12rem' }}
            body={(rowData) => (
              <>
                <Barcode value={rowData.code.toString()} />
              </>
            )}
          ></Column>
          <Column
            field="name"
            header="Nombre"
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field="image"
            header="Imagen"
            body={imageBodyTemplate}
          ></Column>
          <Column
            field="price"
            header="Precio"
            body={priceBodyTemplate}
            sortable
            style={{ minWidth: '8rem' }}
          ></Column>
          <Column
            field="location"
            header="Ubicación"
            sortable
            style={{ minWidth: '10rem' }}
            body={(rowData: { location: Location }) => (
              <span className="badge">
                {SpanishLocations[rowData.location]}
              </span>
            )}
          ></Column>
          <Column
            field="quantity"
            header="Inventario"
            sortable
            style={{ minWidth: '12rem' }}
          ></Column>
          <Column
            field="inventoryStatus"
            header="Estado"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: '12rem' }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '12rem' }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Detalles de producto"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {product.image && (
          <img
            src={`${product.image}`}
            alt={product.image}
            style={{ maxHeight: '200px' }}
            className="product-image block m-auto pb-3"
          />
        )}
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Nombre
          </label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => onInputChange(e, 'name')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className="p-error">El nombre es requerido.</small>
          )}
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price" className="font-bold">
              Precio
            </label>
            <InputNumber
              id="price"
              value={product.price}
              onValueChange={(e) => onInputNumberChange(e, 'price')}
              mode="currency"
              currency="CRC"
              locale="es-CR"
            />
          </div>
          <div className="field col">
            <label htmlFor="quantity" className="font-bold">
              Cantidad
            </label>
            <InputNumber
              id="quantity"
              value={product.quantity}
              onValueChange={(e) => onInputNumberChange(e, 'quantity')}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              Estas seguro de eliminar <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              ¿Está seguro de que desea eliminar los productos seleccionados?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
