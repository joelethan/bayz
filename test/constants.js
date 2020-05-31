export const constants ={
    patch1: {
        "myobj":{
            "baz": "qux",
            "foo": "bar"
            },
        "patch": [
            { "op": "replace", "path": "/baz", "value": "boo" },
            { "op": "add", "path": "/hello", "value": ["world"] },
            { "op": "remove", "path": "/foo" }
            ]
    },
    patch2: {
        "patch": [
            { "op": "replace", "path": "/baz", "value": "boo" },
            { "op": "add", "path": "/hello", "value": ["world"] },
            { "op": "remove", "path": "/foo" }
            ]
    },
    user: {"email":"joel@gmail.com","password":"password"}
}
