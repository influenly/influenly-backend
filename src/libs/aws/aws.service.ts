import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AWSService {
  private s3: AWS.S3;
  constructor(private readonly configService: ConfigService) {
    // this.BUCKET_NAME = 'asd';
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: 'asd',
        secretAccessKey: 'asd'
      }
    });
  }

  async uploadToS3(file: Express.Multer.File, bucket) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucket,
      Key: `profile_images/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
