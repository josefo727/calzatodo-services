# Service Master Data

Servicio VTEX IO que proporciona una capa segura de interacción con VTEX Master Data. Actúa como un puente entre aplicaciones y las APIs REST de Master Data de VTEX, garantizando la seguridad en el acceso a datos.

Este servicio implementa endpoints REST para las operaciones CRUD (crear, leer, actualizar, eliminar) sobre entidades de Master Data, utilizando KoaJS como framework web y node-vtex-api para la integración con los servicios de VTEX.

## Características principales:
- Gestión segura de documentos en Master Data
- Endpoints públicos configurables
- Control de acceso a datos
- Escalabilidad automática (2-4 réplicas)

## Tecnologías:
- TypeScript 5.5.3
- Node.js con KoaJS
- VTEX IO
