export function createElement(vNode) {
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }

    const { type, props, children } = vNode;
    const el = document.createElement(type);

    for (const key in props) {
        if (key === 'className') {
            el.className = props[key];
        } else {
            el.setAttribute(key, props[key]);
        }
    }

    children.forEach(child => {
        el.appendChild(createElement(child));
    });

    return el;
}

export function updateElement(parent, oldVNode, newVNode, index = 0) {
    if (!oldVNode) {
        console.log('oldVNode is null');
        parent.appendChild(createElement(newVNode));
    } else if (!newVNode) {
        console.log('newVNode is null');
        parent.removeChild(parent.childNodes[index]);
    } else if (newVNode.type !== oldVNode.type) {
        console.log('newVNode type is different');
        parent.replaceChild(createElement(newVNode), parent.childNodes[index]);
    } else if (typeof newVNode === 'object' && typeof oldVNode === 'object') {
        console.log('newVNode and oldVNode are objects');
        updateAttributes(parent.childNodes[index], oldVNode.props, newVNode.props);

        const newChildren = newVNode.children || [];
        const oldChildren = oldVNode.children || [];
        const maxLength = Math.max(newChildren.length, oldChildren.length);

        for (let i = 0; i < maxLength; i++) {
            updateElement(parent.childNodes[index], oldChildren[i], newChildren[i], i);
        }
    } else if (typeof newVNode === 'string' && newVNode !== oldVNode) {
        console.log('newVNode is string and different');
        parent.childNodes[index].nodeValue = newVNode;
    }
    console.log('Finished updating element');
}

function updateAttributes(element, oldProps, newProps) {
    console.log('Updating attributes');
    console.log("Element: ", element, "\nOld: ",oldProps,"\nNew: " ,newProps);
    for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {
            if (key === 'className') {
                console.log("Setting class name: ", newProps[key]);
                element.className = newProps[key];
            } else {
                console.log("Setting attribute: ", key, newProps[key]);
                element.setAttribute(key, newProps[key]);
            }
        }
    }

    for (const key in oldProps) {
        if (!(key in newProps)) {
            element.removeAttribute(key);
        }
    }
}