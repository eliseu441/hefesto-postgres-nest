/*
  Warnings:

  - You are about to drop the `tba_clientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tba_clientes" DROP CONSTRAINT "tba_clientes_id_substatus_fkey";

-- DropTable
DROP TABLE "tba_clientes";

-- CreateTable
CREATE TABLE "tbl_clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "id_status" INTEGER NOT NULL,
    "id_substatus" INTEGER NOT NULL,
    "entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_clientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_clientes" ADD CONSTRAINT "tbl_clientes_id_substatus_fkey" FOREIGN KEY ("id_substatus") REFERENCES "tbl_substatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
