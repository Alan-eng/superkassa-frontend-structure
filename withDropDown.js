// @flow

import React from 'react';
import type { ReactClass } from 'flow';
import DropDown from '../components/DropDown';

type Props = {[string]: any};
type State = {
    showDropDown: boolean,
    showProgress: boolean,
}


const withDropDown = (WrappedComponent: ReactClass<any>) =>
    class extends React.Component<void, Props, State> {
        constructor(props: Props) {
            super(props);

            this.hideDropDown = this.hideDropDown.bind(this);
            this.showDropDown = this.showDropDown.bind(this);
            this.dropDown = this.dropDown.bind(this);
            this.state = {
                showDropDown: false,
                showProgress: false,
            };
        }

        state: State;

        componentDidMount() {
            if (window) {
                window.addEventListener('click', this.hideDropDown);
            }
        }

        componentWillUnmount() {
            if (window) {
                window.removeEventListener('click', this.hideDropDown);
            }
        }

        hideDropDown: Function;
        hideDropDown(): void {
            if (!this.state.showProgress) {
                this.setState({ showDropDown: false });
            } else {
                this.setState({ showProgress: false });
            }
        }

        showDropDown: Function;
        showDropDown(event?: Event): void {
            if (event !== undefined && event.type === 'click') {
                this.setState({ showDropDown: true, showProgress: true });
            } else {
                this.setState({ showDropDown: true, showProgress: false });
            }
        }

        dropDown: Function;
        dropDown(children: React.Element<*>, props: {[string]: any} = {}): React.Element<*> | null {
            if (!this.state.showDropDown) {
                return null;
            }

            return <DropDown hideDropDown={this.hideDropDown} {...props}>{children}</DropDown>;
        }

        render() {
            const data = {
                isShowed: this.state.showDropDown,
                showDropDown: this.showDropDown,
                hideDropDown: this.hideDropDown,
                dropDown: this.dropDown,
            };

            return (
                <WrappedComponent
                    dropDown={data}
                    {...this.props}
                />
            );
        }
};

export type DropDownShape = {
    isShowed: boolean,
    showDropDown: Function,
    hideDropDown: Function,
    dropDown: Function,
};

export default withDropDown;
