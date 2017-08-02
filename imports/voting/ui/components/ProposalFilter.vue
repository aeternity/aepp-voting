<template>
    <div class="proposals-filter">
        <div class="container">
            <nav>
                <button class="active">All</button>
                <button>Popular</button>
                <button>Controversial</button>
                <button>Decided</button>
                <button>Valid</button>
                <button>Invalid</button>
                <button>Newest</button>
                <button>Hidden</button>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "/imports/core/ui/styles/variables";
    @import "/imports/core/ui/styles/mixins";

    .proposals-filter {
        background: white;
        padding: 10px 0;
        box-shadow: $base-box-shadow;
        &:hover {
            nav {
                button:not(.active) {
                    color: $base-text-color;
                }
            }
        }
    }
    nav {
        button {
            border: 0;
            font-size: 14px;
            color: lighten($base-text-color, 50%);
            padding: 5px 15px;
            font-family: $font-family-text;
            @include transition(.4s);
            &:hover {
                background: $gray-lighter;
            }
            &.active {
                background: $brand-color;
                color: white;
            }
        }
    }
</style>