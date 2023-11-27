import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');//这里的title是一个state，用来存储用户输入的title
    const [body, setBody] = useState('');//这里的body是一个state，用来存储用户输入的body
    const [author, setAuthor] = useState('mario');// 这里的author是一个state，用来存储用户输入的author
    const [isPending, setIsPending] = useState(false);//这里是为了在fetch的时候显示Loading
    const navigate = useNavigate();//这里是为了在fetch成功之后，跳转到首页

    const handleSubmit = (e) => {
        e.preventDefault();//这里是为了阻止submit之后的页面刷新
        const blog = { title, body, author };//这里是把用户输入的title, body, author组成一个对象，储存在blog里

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {//这里是把blog传递给服务器
            method: 'POST',
            headers: { "Content-Type": "application/json" },//这里是告诉服务器，传递的是json
            body: JSON.stringify(blog)//这里是把blog转换成json
        }).then(() => {//这里是在服务器响应之后，触发then
            console.log('new blog added');
            setIsPending(false);
            navigate('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}//这里的onChange是一个事件监听器，当用户输入时，储存用户输入的value,并且把它传递给title
                />
                <label>Blog body</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}//这里的onChange是一个事件监听器，当用户输入时，储存用户输入的value,并且把它传递给body
                ></textarea>
                <label>Blog author</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}//这里的onChange是一个事件监听器，当用户输入时，储存用户输入的value,并且把它传递给author
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>

     );
}
 
export default Create;