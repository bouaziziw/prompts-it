import { HttpInterceptorFn } from '@angular/common/http'

// This is a basic implementation of an HTTP interceptor. You can modify it to add authentication tokens, handle errors, etc.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      // You can add headers or modify the request here
      // For example, to add an Authorization header:
      // headers: req.headers.set('Authorization', 'Bearer your-token-here'
      withCredentials: true, // Include cookies in requests if needed
    }),
  )
}
