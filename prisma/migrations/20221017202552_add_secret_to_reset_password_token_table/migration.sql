/*
  Warnings:

  - Added the required column `secret` to the `ResetPasswordToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resetpasswordtoken` ADD COLUMN `secret` VARCHAR(191) NOT NULL;
