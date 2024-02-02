import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';

interface Product {
    name: string;
    price: number;
    inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
    image: string;
}

export const Carrousel = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const getSeverity = (product: Product) => {
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

    useEffect(() => {
        // Simulando la obtención de productos
        const fakeProducts: Product[] = [
            { name: 'Product 1', price: 20, inventoryStatus: 'INSTOCK', image: 'prod1.jpg' },
            { name: 'Product 2', price: 30, inventoryStatus: 'LOWSTOCK', image: 'prod2.jpg' },
            { name: 'Product 3', price: 20, inventoryStatus: 'INSTOCK', image: 'prod3.jpg' },
            { name: 'Product 4', price: 30, inventoryStatus: 'LOWSTOCK', image: 'prod1.jpg' },
            // Agrega más productos según tus necesidades
        ];
        setProducts(fakeProducts);
    }, []);

    const productTemplate = (product: Product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={`/images/${product.image}`} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" rounded />
                        <Button icon="pi pi-star-fill" rounded severity={getSeverity(product)} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
    );
};
