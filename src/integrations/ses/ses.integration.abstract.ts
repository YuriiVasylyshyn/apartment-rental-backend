export abstract class SESIntegration {
  public abstract sendEmail(): Promise<void>;
}
