void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord / iResolution;
    fragColor = vec4( uv, 0.5 + 0.5 * sin( iGlobalTime ), 1.0 );
}
