<template>
    <div ref="upgradecraft" v-if="craftData && cart" id="upgrade-craft">
        <div id="upgrade-craft-compare" class="body">
            <table class="data fullwidth">
                <thead>
                <tr class="logos">
                    <th>
                        <img :src="craftData.craftLogo" width="70" height="70" />
                    </th>
                    <th scope="col">
                        <h1 class="logo">Solo</h1>
                        <p>{{ "For personal projects."|t('app') }}</p>
                    </th>
                    <th scope="col">
                        <h1 class="logo">Pro</h1>
                        <p>{{ "For everything else."|t('app') }}</p>
                    </th>
                </tr>
                <tr class="license-statuses">
                    <td></td>
                    <td><status-badge :edition="craftData.CraftSolo" /></td>
                    <td><status-badge :edition="craftData.CraftPro" /></td>
                </tr>
                <tr class="price">
                    <th scope="row" class="feature"></th>
                    <td>{{ "Free"|t('app') }}</td>
                    <td v-if="craftData.editions">
                        {{ "{price} plus {renewalPrice}/year for updates"|t('app', {
                            price: $options.filters.currency(craftData.editions.pro.price),
                            renewalPrice: $options.filters.currency(craftData.editions.pro.renewalPrice)
                        }) }}
                    </td>
                </tr>
                <tr class="buybtns">
                    <td></td>
                    <td><buy-btn :edition="craftData.CraftSolo" edition-handle="solo" /></td>
                    <td><buy-btn :edition="craftData.CraftPro" edition-handle="pro" /></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th class="group" colspan="3">{{ "Features"|t('app') }}</th>
                </tr>
                <tr>
                    <th class="feature" scope="row">{{ "Content Modeling"|t('app') }} <span class="info">{{ "Includes Sections, Global sets, Category groups, Tag groups, Asset volumes, Custom fields, Entry versioning, and Entry drafts"|t('app') }}</span></th>
                    <td><span data-icon="check"></span></td>
                    <td><span data-icon="check"></span></td>
                </tr>
                <tr>
                    <th class="feature" scope="row">{{ "Multi-site Multi-lingual"|t('app') }} <span class="info">{{ "Includes Multiple locales, Section and entry locale targeting, Content translations"|t('app') }}</span></th>
                    <td><span data-icon="check"></span></td>
                    <td><span data-icon="check"></span></td>
                </tr>
                <tr>
                    <th class="feature" scope="row">{{ "Cloud Storage Integration"|t('app') }}</th>
                    <td><span data-icon="check"></span></td>
                    <td><span data-icon="check"></span></td>
                </tr>
                <tr>
                    <th class="feature" scope="row">{{ "User Accounts"|t('app') }} <span class="info">{{ "Includes User accounts, User groups, User permissions, Public user registration"|t('app') }}</span></th>
                    <td></td>
                    <td><span data-icon="check"></span></td>
                </tr>
                <tr>
                    <th class="feature" scope="row">{{ "System Branding"|t('app') }} <span class="info">{{ "Includes Custom login screen logo, Custom site icon, Custom HTML email template, Custom email message wording"|t('app') }}</span></th>
                    <td></td>
                    <td><span data-icon="check"></span></td>
                </tr>
                <tr>
                    <th class="group" colspan="3">{{ "Support"|t('app') }}</th>
                </tr>
                <tr>
                    <th class="feature" scope="row">{{ "Security & Bug Fixes"|t('app') }}</th>
                    <td><span data-icon="check"></span></td>
                    <td><span data-icon="check"></span></td>
                </tr>
                <tr>
                    <th class="feature" scope="row">{{ "Community Support (Slack, Stack Exchange)"|t('app') }}</th>
                    <td><span data-icon="check"></span></td>
                    <td><span data-icon="check"></span></td>
                </tr>
                <tr>
                    <th class="feature" scope="row">{{ "Developer Support"|t('app') }}</th>
                    <td></td>
                    <td><span data-icon="check"></span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {

        components: {
            StatusBadge: require('../components/upgradecraft/StatusBadge'),
            BuyBtn: require('../components/upgradecraft/BuyBtn'),
        },

        computed: {
            ...mapGetters({
                craftData: 'craftData',
                cart: 'cart'
            }),
        },

        created() {
            this.$root.crumbs = [
                {
                    label: this.$options.filters.t("Plugin Store", 'app'),
                    path: '/',
                }
            ]

            this.$root.pageTitle = this.$options.filters.t('Upgrade Craft CMS', 'app')
        },

        mounted() {
            this.$root.$on('allDataLoaded', function() {
                Craft.initUiElements(this.$refs.upgradecraft)
            }.bind(this))

            Craft.initUiElements(this.$refs.upgradecraft)
        },
    }
</script>
