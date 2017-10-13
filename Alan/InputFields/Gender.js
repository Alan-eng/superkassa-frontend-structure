import style from './Gender.css';
import React from 'react';

const maleIcon = <svg width='12' height='34' viewBox='0 0 12 34' xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'>
    <desc>Created using Figma</desc>
    <use xlinkHref='#maleIcon' fill='#003267' fillOpacity='.8'
    />
    <defs>
        <path id='maleIcon' d='M6 0c.91 0 1.78.358 2.424.996.643.637 1.005 1.502 1.005 2.404 0 .902-.363 1.767-1.006 2.404C7.78 6.442 6.91 6.8 6 6.8c-.91 0-1.78-.358-2.424-.996C2.933 5.167 2.57 4.302 2.57 3.4c0-.902.363-1.767 1.006-2.404C4.22.358 5.09 0 6 0zM3.43 8.5h5.14c.91 0 1.783.358 2.426.996C11.64 10.133 12 10.998 12 11.9v9.35H9.43V34H2.57V21.25H0V11.9c0-.902.36-1.767 1.004-2.404C1.647 8.858 2.52 8.5 3.43 8.5z'
        />
    </defs>
</svg>

const femaleIcon = <svg width='16' height='34' viewBox='0 0 16 34' xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'>
    <desc>Figma</desc>
    <use xlinkHref='#femaleIcon' fill='#003267' fillOpacity='.24'
    />
    <defs>
        <path id='femaleIcon' d='M8 0c.943 0 1.847.358 2.514.996.667.637 1.042 1.502 1.042 2.404 0 .902-.375 1.767-1.042 2.404-.667.638-1.57.996-2.514.996-.943 0-1.847-.358-2.514-.996C4.82 5.167 4.444 4.302 4.444 3.4c0-.902.375-1.767 1.042-2.404C6.153.358 7.056 0 8 0zM5.333 34V23.8H0l4.604-12.903C5.05 9.503 6.4 8.5 8 8.5c1.6 0 2.95 1.003 3.396 2.397L16 23.8h-5.333V34H5.333z'
        />
    </defs>
</svg>

class Gender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: 'male',
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleLabelStyle = this.handleLabelStyle.bind(this);
    }

    handleChange(event) {
        this.setState({ checked: 'male' });
    }

    render() {
        return (
            <div className={style.wrapper}>
                <label>Пол</label>
                <button className={style.btn}
                onClick={(e) => this.setState({ checked: 'male' })}
                style={this.state.checked === 'male' ? { backgroundColor: '#B4EAF8' } : {}}>
                {maleIcon}
                </button>
                <button className={style.btn}
                onClick={(e) => this.setState({ checked: 'female' })}
                style={this.state.checked === 'female' ? { backgroundColor: '#B4EAF8' } : {}}>
                {femaleIcon}
                </button>
            </div>
        )
    }
}


export default Gender 