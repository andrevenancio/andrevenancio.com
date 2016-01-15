vec3 texCol( vec2 p, float b ) {
    vec3 col = texture2D( iChannel1, p, b ).xyz;
    col *= ( col.x + col.y + col.z ) / 3.0;
    return col;
}

vec2 perlin( vec2 p ) {
    vec2 x = vec2( 0.0 );
    for ( int i = 0; i < 4; ++i ) {
        float j = pow( 2.0, float( i ) );
        x += ( texture2D( iChannel0, p * j * 0.001 ).xy - 0.5 ) / j;
    }
    return x;
}

vec3 smoke(vec2 p, vec2 o, float t)
{
    const int steps = 20;
    vec3 col = vec3(0.0);
    for (int i = 1; i < steps; ++i) {
        p += perlin(p + o) * t * 0.01 / float(i);
        p.y -= t * 0.003; //drift upwards

        col += texCol(p, float(steps-i) * t * 0.2);
    }
        return pow( col.xyz / float( steps ), vec3( 1.5 ) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // uv magic with the kind help of kig (https://www.shadertoy.com/user/kig)
    vec2 uv = (-1.0 + 2.0 * fragCoord.xy / iResolution.xy) * vec2(iResolution.x / iResolution.y, 1.0);
    uv *= iResolution.x / 2.0;
    uv /= vec2(512.0);
    uv += 0.5;

    fragColor = vec4(0.0, 0.0, 0.0, 1.0);

    if ( any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0))) ) {
        return;
    }

    float sine = 3.0 + 3.0 * cos( iGlobalTime * 1.0 );
    float t = sine;

    t = max( 0.0, t - uv.x - 1.0 + uv.y );
    t *= t;
    fragColor = vec4(smoke( uv, fragCoord.xy / 2.0, t ), 1.0);
}
