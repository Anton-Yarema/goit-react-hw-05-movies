import React from 'react';
import { Circles } from 'react-loader-spinner';
import css from './loader.module.css'


const Loader = () => (
    <div className={css.loader}>
        <Circles
            height="80"
            width="80"
            color="#1500ffdd"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />

    </div>
);

export default Loader;