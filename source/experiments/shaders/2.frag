void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord / iResolution;
    uv.x = uv.x + 0.5 * cos( iGlobalTime );
    uv.y = uv.x + 0.2 * sin( iGlobalTime );
    fragColor = texture2D( iChannel0, uv ) * vec4( uv, 0.5 + 0.5 * sin( iGlobalTime ), 1.0 );
}
