void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord.xy / iResolution.xy;

    float scaleY = 0.5 + 0.5 * sin(iGlobalTime);

    // quad background gradient colors
    vec3 bl = vec3(0.21568627450980393, 0.396078431372549, 0.5764705882352941);
    vec3 br = vec3(0.29411764705882354, 0.44313725490196076, 0.5607843137254902);
    vec3 tl = vec3(0.34509803921568627, 0.7529411764705882, 0.6901960784313725);
    vec3 tr = vec3(0.37254901960784315, 0.7803921568627451, 0.6941176470588235);

    // quad background gradient
    vec3 bg = mix(
        mix(bl, br, uv.x),
        mix(tl, tr, uv.x),
        uv.y
    );

    // blend second gradient
    vec4 gradient = mix(vec4(0.882, 0.458, 0.439, 1.0), vec4(0.764, 0.643, 0.807, 0.0), min(1.0, uv.y / scaleY));

    // change height or second gradient
    vec4 col = mix( mix(vec4(bg, 1.), gradient, gradient.a), vec4(bg, 1.), smoothstep(scaleY-0.00001, scaleY, uv.y));

    fragColor = col;
}
