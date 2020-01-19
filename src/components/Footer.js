import React, { Component, useState } from 'react'

export default function Footer() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <footer className="page-footer font-small blue">
                <div className="footer-copyright text-center py-3"> No copyrights:
                    <button href='xd' onClick={() => setCount(count + 1)}>
                        <a href="https://mdbootstrap.com/education/bootstrap/"> site.com</a>
                    </button>
                    <p>You clicked {count} times</p>
                </div>
            </footer>
        </div>
    )
}
