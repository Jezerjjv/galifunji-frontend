import React from 'react';

const Divider = ({ light }) => (
    <div className={`divider my-5 ${light ? 'bg-light' : 'bg-dark'}`}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8 col-md-6 col-lg-4">
                    <hr className={`border-2 opacity-25 ${light ? 'border-dark' : 'border-light'}`} />
                </div>
            </div>
        </div>
    </div>
);

export default Divider;