export class MemberCard {
    constructor(containerId, members) {
        this.container = document.getElementById(containerId);
        this.members = members;
    }

    render() {
        const cardsHTML = this.members.map(member => `
            <div class="card">
                <img src="${member.image}" alt="${member.title}" class="card__image">
                <div class="card__body">
                    <div class="card__header">
                        <h3 class="card__title">${member.title}</h3>
                    </div>
                    <p class="card__desc">${member.description}</p>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `<div class="quiz-grid">${cardsHTML}</div>`;
    }
}