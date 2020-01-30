import React from 'react';
import styles from './Searchbar.module.scss';

const AutoCompletePopup = (props) => {
    if (!props.isOpen) return null;
    return (
        <div className={styles.popupParent}>
            <div className={styles.popup}>
                <div className={styles.container}>
                    <div className={styles.content}>

                        {props.items &&
                        props.items.map((item, idx) => {
                            return (
                                <div
                                    className={styles.item}
                                    key={idx}
                                    onClick={()=>props.select(item.name) }
                                >
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoCompletePopup;