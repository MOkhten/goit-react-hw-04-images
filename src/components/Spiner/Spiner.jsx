import { InfinitySpin } from 'react-loader-spinner';
import css from './Spiner.module.css';

export const Spiner = () => {
    return (
        <div className={css.loader}>
<InfinitySpin 
                width='500'
                color="#4fa94d"
                position = 'center'
                visible={true}
/>
        </div>
    );
};