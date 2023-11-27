import{Link} from 'react-router-dom';//Link会阻止向服务器发送请求，而是使用客户端路由，这样就不会刷新页面了

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
            </div>
        </nav>
    );
}
 
export default Navbar
