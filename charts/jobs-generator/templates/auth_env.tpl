{{- define "auth.env" }}
- name: PORT
  value: "{{ .Values.auth.port.http }}"
- name: JWT_SECRET
  value: {{ .Values.auth.jwt.secret }}
- name: JWT_EXPIRES_IN
  value: "{{ .Values.auth.jwt.expirationMs }}"
- name: AUTH_GRPC_SERVICE_URL
  value: "0.0.0.0:{{ .Values.auth.port.grpc }}"
{{- end }}