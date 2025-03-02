export abstract class AppService {
  public abstract getHello(): string;
  public abstract healthCheck(): Promise<string>;
}
