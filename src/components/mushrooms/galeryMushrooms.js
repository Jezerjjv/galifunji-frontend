import { Mushrooms } from "./mushrooms";

export const GaleryMushrooms = ({ setas }) => {
    return (
        setas.length > 0 ?
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {setas.map((seta, index) => (
                    <Mushrooms key={index} seta={seta} />
                ))}
            </div>
            : <h1 className='text-center my-5'>No hay setas 🍄</h1>
    );
};  
