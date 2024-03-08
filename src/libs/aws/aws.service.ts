import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AWSService {
  private s3Client: S3Client;
  constructor(private readonly configService: ConfigService) {
    // this.BUCKET_NAME = 'asd';
    const s3Client = new S3Client({});
  }

  async uploadToS3(file: Express.Multer.File, bucket) {
    const params = {
      Bucket: bucket,
      Key: `profile_images/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    // try {
    //   let s3Response = await this.s3.upload(params).promise();
    //   return s3Response;
    // } catch (e) {
    //   console.log(e);
    // }
  }
}
