import React from 'react';
// import styled from 'styled-components';

import Checkbox from '../../../components/Alan/Checkbox/Checkbox';
import styles from './InsuarenceRow.css';

//styled - это полноценный компонент Реакта, и у него вызываем функцию button с помощью синтаксиса шаблонной строки, тоже самое, что при мпомощи скобок, только после вызова строка преобразуется к массиву
// когда устанавилваем primary property - добавляем еще немного CSS
//все вендорные префиксы будут выставлены автоматически, так что не нужно даже о них думать

const InsuarenceIcon = <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <desc>Created using Figma</desc>
    <use xlinkHref="#InsuarenceIcon" fill="#003267" />
    <use xlinkHref="#InsuarenceIcon" fill="#01BDEA" fillOpacity=".24" />
    <defs>
        <path id="InsuarenceIcon" d="M6.006 0v4H3.01C1.86 4 1.132 5 1.012 6L.014 16c-.12 1 .54 2 1.997 2h15.98c1.457 0 2.116-1 1.996-2l-.998-10c-.12-1-.94-2-1.998-2h-2.995V0h-7.99zm1.997 2h3.994v2H8.003V2zM9 7h2v3h2.995v2h-2.996v3H9v-3H6.007v-2H9V7z"
        />
    </defs>
</svg>


// ---------------------------------------------------

// const Label = styled.div`  
// margin-left: 1em;
// `;


// const Wrapper = styled.section`
// padding-left: 32px;
// padding-right: 32px;
// background-color: #B1E4F6;
// border-radius: 3px;
// `

// const ContainerFlex = styled.div`
// display: flex;
// justify-content: space-between;
// padding-bottom: 14px;
// padding-top: 14px;
// color: #1A5488;
// cursor: pointer;
// `

// const ContainerFlexJustify = styled.div`
// max-height: 0px;
// overflow: hidden;
// transition: max-height 0.5s cubic-bezier(.525,.66,.495,1.4);  
// display: flex;
// justify-content: space-between;
// color: #1A5488;
// `

// const InsuarenceVariant = styled.div`
// height: 80px;
// display: flex;
// flex-wrap: wrap;
// align-content: space-between;
// padding: 1em;
// background-color: #F2FAFD;
// color: #10396;
// width: 28%;
// border: 1px solid #8BDDF5;
// border-radius: 3px;
// margin-top: 8px;
// margin-bottom: 24px;
// `
// const ReadMore = styled.div`
// display: flex;
// width: 100%;
// justify-content: space-between;
// `

// const P = styled.p`
// margin: 0;
// text-align: left;
// font-size: 16px;
// `
// const Link = styled.a`
// text-decoration: none;
// font-size: 14px;
// color: #41BEEC;
// font-weight: 600;
// border-bottom: 1px solid currentColor;
// `

class InsuarenceRow extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: true
        }
    }

    render() {
        return (<div>
            <section className={styles.wrapper}>
                <div className={styles.containerFlex} onClick={(e) => this.setState({ collapsed: !this.state.collapsed })}>
                    <div style={{display: 'flex'}}>
                    {InsuarenceIcon}
                    <div className={styles.mainLabel}>Добавить страховки</div>
                    </div>
                    <Checkbox/>
                </div>
                <div className={styles.containerFlexJustify} style={this.state.collapsed ? {} : { maxHeight: '160px' }}>
                    <div className={styles.insuarenceVariant}>
                        <p className={styles.readMoreLabel}>Страхование пассажиров от несчастного случая</p>
                        <div className={styles.readMore}>
                            <a className={styles.link} href="#">Выплата до 1 000 000 Р</a>
                            <Checkbox />
                        </div>
                    </div>

                    <div className={styles.insuarenceVariant}>
                        <p className={styles.readMoreLabel}>Страхование багажа и задержки рейса</p>
                        <div className={styles.readMore}>
                            <a className={styles.link} href="#">Подробнее</a>
                            <Checkbox />
                        </div>
                    </div>

                    <div className={styles.insuarenceVariant}>
                        <p className={styles.readMoreLabel}>Медицинская страховка</p>
                        <div className={styles.readMore}>
                            <a className={styles.link} href="#">Подробнее</a>
                            <Checkbox />
                        </div>
                    </div>
                </div>
            </section>
        </div>)
    }
}

export default InsuarenceRow