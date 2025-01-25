import { useState, useEffect } from 'react';
import ProductCarousel from '../../components/ProductCarousel';
import ProductSizeSelecter from '../../components/ProductSizeSelecter';
import HorizontalProductList from '../../components/HorizontalProductList';

interface ProductDetailsResponse {
    mainImage: string;
    images: string[];
    sizes: { label: string; price: number }[];
    relatedProducts: { id: number; name: string; image: string; price: number }[];
}

const ProductDetails: React.FC = () => {
    const [ mainImage, setMainImage ] = useState<string>('');
    const [ selectedSize, setSelectedSize ] = useState<string>('');
    const [ price, setPrice ] = useState<number>(0);
    const [ relatedProducts, setRelatedProducts ] = useState<{ id: number; name: string; image: string; price: number }[]>([]);
    const [ images, setImages ] = useState<string[]>([]);

    useEffect(() => {
        // fetch prod details from API
        fetch("/api/product/1").then((res) => res.json()).then((data: ProductDetailsResponse) => {
            setMainImage(data.mainImage);
            setImages(data.images);
            setPrice(data.sizes.find((size) => size.label ===selectedSize)?.price || 0);
            setRelatedProducts(data.relatedProducts);
        });
    }, [selectedSize]);

    return (
        <div className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
            <div>
                <img src="{mainImage}" alt="gas cylinder" className="w-full rounded-md" />
                <ProductCarousel images={images} setMainImage={setMainImage} />
            </div>
            <div>
                <h1 className="text-3xl font-bold">Gas Cylinder</h1>
                <ProductSizeSelecter 
                    sizes = {[
                        { label : "2.5Kg", price: 990},
                        { label : "5Kg", price: 2000},
                        { label : "12Kg", price: 4800},
                    ]}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    setPrice={setPrice}
                />
                <p className="text-xl font-bold mt-6">${price}</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md mt-6" onClick={() => alert(`Added $(selectedSize) to cart`)}>
                    Add To Cart
                </button>
            </div>

            {/* Related Products */}
            <div className="bg-gray-50 py-8">
                <h2 className="text-2xl font-bold px-6">You May Also Like</h2>
                <HorizontalProductList products={relatedProducts} />
            </div>
        </div>
    );
};




