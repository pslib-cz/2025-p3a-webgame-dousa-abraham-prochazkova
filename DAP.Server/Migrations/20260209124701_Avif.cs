using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAP.Server.Migrations
{
    /// <inheritdoc />
    public partial class Avif : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 1,
                column: "SceneImage",
                value: "/images/sc0-intro.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 2,
                column: "SceneImage",
                value: "/images/sc1-square.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 3,
                column: "SceneImage",
                value: "/images/sc2-hall.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 4,
                column: "SceneImage",
                value: "/images/sc3-office.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 5,
                column: "SceneImage",
                value: "/images/sc4-vault.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 6,
                column: "SceneImage",
                value: "/images/sc5-end.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 7,
                column: "SceneImage",
                value: "/images/phone-overlay.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 8,
                column: "SceneImage",
                value: "/images/kod.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 9,
                column: "SceneImage",
                value: "/images/levers-bg.avif");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 10,
                column: "SceneImage",
                value: "/images/sc3-office-cardless.avif");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 1,
                column: "SceneImage",
                value: "/images/sc0-intro.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 2,
                column: "SceneImage",
                value: "/images/sc1-square.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 3,
                column: "SceneImage",
                value: "/images/sc2-hall.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 4,
                column: "SceneImage",
                value: "/images/sc3-office.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 5,
                column: "SceneImage",
                value: "/images/sc4-vault.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 6,
                column: "SceneImage",
                value: "/images/sc5-end.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 7,
                column: "SceneImage",
                value: "/images/phone-overlay.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 8,
                column: "SceneImage",
                value: "/images/kod.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 9,
                column: "SceneImage",
                value: "/images/levers-bg.png");

            migrationBuilder.UpdateData(
                table: "Scene",
                keyColumn: "UserId",
                keyValue: 10,
                column: "SceneImage",
                value: "/images/sc3-office-cardless.png");
        }
    }
}
