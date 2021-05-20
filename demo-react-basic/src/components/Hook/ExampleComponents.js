import React, { useEffect, useState } from "react";

function ExampleComponents() {
    // const initialValue = () => {
    //     let total = 0;
    //     for (let i = 0; i < 10; i++) {
    //         total += i;
    //     }
    //     console.log('initial')
    //     console.log(total)
    //     return total
    // }

    // const [count, setCount] = useState(()=>{
    //     return initialValue()
    // });
    const [count, setCount] = useState(0);
    // const [action, setAction] = useState("");
    // // const [scrollPosition, setScrollPosition] = useState(0);
    // const [user, setUser] = useState({
    //     name: "hải", age: 22
    // })

    useEffect(() => {
        // componentDidMount & componentDidUpdate
        console.log(`You click`);
        return () => {
            // clear up function
            console.log('useEffect - count - cleanup')
        };
    }, [count]);

    // useEffect(() => {
    //     fetch(`https://reqres.in/api/${action}`)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [action]);

    // const handleScroll = () => {
    //     setScrollPosition(window.scrollY);
    // };

    // useEffect(() => {
    //     document.addEventListener("scroll", handleScroll);
    //     return () => {
    //         // like componentWillUnmount
    //         document.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    const handleClick = () => {
        // prevState lưu giữ giá trị state trước đó
        // setCount((prevState) => {
        //     return prevState + 1
        // });

        // setCount((prevState) => {
        //     return prevState + 1
        // });

        // setUser({
        //     name:'update',
        // });

        // setCount(count + 1)
        setCount(count + 1);
    };

    return (
        <div style={{ height: "3000px" }}>
            <pre>Function Components</pre>
            <p>You click {count} times</p>
            <button onClick={handleClick}>Click me</button>
            {/* 
            <button onClick={() => setUser({ ...user, name: "update" })}>Get user </button>

            <button onClick={() => setAction("avcvcvc" + 1)}>Get coment </button>
            <p>{JSON.stringify(user)}</p> */}
            {/* <p style={{ position: "fixed" }}>{scrollPosition}</p> */}
        </div>
    );
}

export default ExampleComponents;
