using Microsoft.EntityFrameworkCore.Migrations;

namespace my_app2.Data.Migrations
{
    public partial class AddTodo2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Todos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Todos",
                type: "TEXT",
                nullable: true);
        }
    }
}
