using Microsoft.EntityFrameworkCore.Migrations;

namespace my_app2.Data.Migrations
{
    public partial class addProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isComplete",
                table: "Todos",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isComplete",
                table: "Todos");
        }
    }
}
