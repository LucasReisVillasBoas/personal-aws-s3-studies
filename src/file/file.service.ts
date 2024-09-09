import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'mfb-aws',
        Key: fileName,
        Body: file,
      }),
    );
  }

  async download(fileName: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: 'mfb-aws',
      Key: fileName,
    });

    const data: GetObjectCommandOutput = await this.s3Client.send(command);

    return data.Body as Readable;
  }
}
