# Outrun Website

## Security Considerations

This project follows strict Content Security Policy (CSP) guidelines to prevent XSS attacks:

1. We do not use `eval()`, `new Function()`, or string-based `setTimeout`/`setInterval`
2. We use native `JSON.parse()` instead of eval-based parsing
3. We avoid libraries that rely on dynamic code evaluation
4. All scripts are either inline or loaded from the same origin

If you need to modify the CSP, please consider the security implications and avoid using 'unsafe-eval' unless absolutely necessary.
