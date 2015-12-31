import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Todo from './Todo';

export default React.createClass({
    componentDidMount: function () {
        this.props.fetchTodo();
    },

    render: function () {
        return (
            <div className="app">
                <AppHeader />
                <Todo { ...this.props } />
                <AppFooter />
            </div>
        );
    }
});