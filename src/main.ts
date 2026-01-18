// Bootstrap minimal placeholder for NestJS application
// Actual NestJS wiring (modules/providers/controllers) will be added later.

async function bootstrap() {
  console.log('Bootstrap placeholder - NestJS app will be initialized here');
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
