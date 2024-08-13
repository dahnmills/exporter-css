!function(e){
    var r={};
    function n(t){
        if(r[t])return r[t].exports;
        var o=r[t]={i:t,l:!1,exports:{}};
        return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports
    }
    n.m=e,n.c=r,n.d=function(e,r,t){
        n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})
    },
    n.r=function(e){
        "undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),
        Object.defineProperty(e,"__esModule",{value:!0})
    },
    n.t=function(e,r){
        if(1&r&&(e=n(e)),8&r)return e;
        if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;
        var t=Object.create(null);
        if(n.r(t),
        Object.defineProperty(t,"default",{enumerable:!0,value:e}),
        2&r&&"string"!=typeof e)
            for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));
        return t
    },
    n.n=function(e){
        var r=e&&e.__esModule?function(){return e.default}:function(){return e};
        return n.d(r,"a",r),r
    },
    n.o=function(e,r){
        return Object.prototype.hasOwnProperty.call(e,r)
    },
    n.p="",
    n(n.s=0)
}([function(e,r){
    function n(e){
        var r,n=t((r=e.value.radius.measure)<=0?0:r),
            o=t(e.value.x.measure),
            a=t(e.value.y.measure),
            u=t(e.value.spread.measure);
        return `${"Inner"===e.value.type?"inset ":""}${o} ${a} ${n} ${u} ${
            function(e){
                if(0===e.a)return`rgb(${e.r},${e.g},${e.b})`;
                {
                    const r=Math.round(e.a/255*100)/100;
                    return`rgba(${e.r},${e.g},${e.b},${r})`
                }
            }(e.value.color)
        }`
    }
    function t(e){return 0===e?""+e:e+"px"}
    
    // Updated function for generating readable variable names
    Pulsar.registerFunction("readableVariableName",(function(e,r,n){
        const t=[...r.path];
        r.isRoot&&r.isNonVirtualRoot||t.push(r.name),
        t.push(e.name),
        n&&n.length>0&&t.unshift(n);
        
        let o=t.join(" ");
        o=o.toLowerCase()
            .replace(/^color/, '')  // Remove "color" from the beginning
            .replace(/[^a-zA-Z0-9]+(.)/g, (e,r) => '-' + r)  // Replace non-alphanumeric characters with hyphens
            .replace(/[^a-zA-Z0-9_-]/g,"_");
        
        if(/^\d/.test(o)) o="_"+o;
        return o;
    })),
    
    Pulsar.registerFunction("findAliases",(function e(r,n){
        let t=n.filter(e=>e.value.referencedToken&&e.value.referencedToken.id===r.id);
        for(const r of t)t=t.concat(e(r,n));
        return t
    })),
    
    Pulsar.registerFunction("gradientAngle",(function(e,r){
        var n=r.y-e.y,t=r.x-e.x,o=180*Math.atan2(n,t)/Math.PI;
        return((o+=90)<0?360+o:o)%360
    })),
    
    Pulsar.registerPayload("behavior",{
        colorTokenPrefix:"color",
        borderTokenPrefix:"border",
        gradientTokenPrefix:"gradient",
        measureTokenPrefix:"measure",
        shadowTokenPrefix:"shadow",
        typographyTokenPrefix:"typography"
    }),
    
    Pulsar.registerFunction("shadowDescription",(function(e){
        let r="transparent";
        return e.shadowLayers?(r=e.shadowLayers.reverse().map(e=>n(e)).join(", "),null!=r?r:""):n(e)
    }))
}]);
