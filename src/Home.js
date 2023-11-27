import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');


    //把blogs传给BlogList，不让Home直接渲染BlogList
    //如果有error，就显示error
    //如果页面还在fetch，就显示Loading
    //&&是逻辑与，如果blogs存在，就渲染BlogList
    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title = 'All Blogs'/>}
        </div>
    );
}
 
export default Home;