"""empty message

Revision ID: acb53fcd2401
Revises: fc6731181fda
Create Date: 2024-06-02 21:17:29.735340

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'acb53fcd2401'
down_revision = 'fc6731181fda'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=15),
               nullable=False)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=15),
               nullable=False)
        batch_op.alter_column('user_type',
               existing_type=sa.VARCHAR(length=10),
               nullable=False)
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.VARCHAR(length=40), nullable=False))
        batch_op.alter_column('user_type',
               existing_type=sa.VARCHAR(length=10),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=15),
               nullable=True)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=15),
               nullable=True)

    # ### end Alembic commands ###
